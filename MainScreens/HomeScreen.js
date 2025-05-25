// 🔄 Your original imports (unchanged)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { collectionGroup, onSnapshot, getDocs, query, collection } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigation } from '@react-navigation/native'; // ✅ Added for cart navigation

const PIZZA_SIZES = ['Small', 'Medium', 'Large'];

const HomeScreen = () => {
  const navigation = useNavigation(); // ✅ Hook for navigation
  const [allItems, setAllItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedRestaurants, setExpandedRestaurants] = useState({});
  const [pizzaSelection, setPizzaSelection] = useState({});
  const [userCart, setUserCart] = useState({});
  const [restaurantStatus, setRestaurantStatus] = useState({});
  const [addedMessageId, setAddedMessageId] = useState(null);

  useEffect(() => {
    const fetchItemsAndStatus = async () => {
      try {
        const q = collectionGroup(db, 'items');
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        }));
        setAllItems(items);

        const statusQuery = await getDocs(collection(db, 'restaurants'));
        const statusMap = {};
        statusQuery.forEach(doc => {
          const data = doc.data();
          if (data.name) statusMap[data.name] = data.status || 'open';
        });
        setRestaurantStatus(statusMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemsAndStatus();
  }, []);

  const getImageUri = (base64Str) => {
    if (!base64Str) return null;
    if (base64Str.startsWith('data:image')) return base64Str;
    return `data:image/jpeg;base64,${base64Str}`;
  };

  const changePizzaSize = (id, size) => {
    setPizzaSelection(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
        qty: prev[id]?.qty || 1,
        veg: prev[id]?.veg ?? true,
        desc: prev[id]?.desc || '',
      },
    }));
  };

  const changeQty = (id, delta) => {
    const newQty = Math.max(1, (pizzaSelection[id]?.qty || 1) + delta);
    setPizzaSelection(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        qty: newQty,
        size: prev[id]?.size || PIZZA_SIZES[0],
        veg: prev[id]?.veg ?? true,
        desc: prev[id]?.desc || '',
      },
    }));
  };

  const setDescription = (id, desc) => {
    setPizzaSelection(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        desc,
        size: prev[id]?.size || PIZZA_SIZES[0],
        qty: prev[id]?.qty || 1,
        veg: prev[id]?.veg ?? true,
      },
    }));
  };

  const setVegType = (id, veg) => {
    setPizzaSelection(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        veg,
        size: prev[id]?.size || PIZZA_SIZES[0],
        qty: prev[id]?.qty || 1,
        desc: prev[id]?.desc || '',
      },
    }));
  };

  const handleOrderNow = (item) => {
    if (!item.available || restaurantStatus[item.restaurantName] === 'closed') return;

    const selection = pizzaSelection[item.id] || {};
    const orderDetails = {
      ...item,
      qty: selection.qty || 1,
      size: selection.size || PIZZA_SIZES[0],
      veg: selection.veg ?? true,
      desc: selection.desc || '',
    };

    setUserCart(prev => ({ ...prev, [item.id]: orderDetails }));
    setAddedMessageId(item.id);
    setTimeout(() => setAddedMessageId(null), 3000);
  };

  const filteredItems = allItems.filter(item => {
    const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase()) ||
                        item.restaurantName?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || item.category?.toLowerCase() === selectedCategory;
    return matchSearch && matchCategory;
  });

  const itemsByRestaurant = filteredItems.reduce((acc, item) => {
    const rest = item.restaurantName || 'Unknown';
    if (!acc[rest]) acc[rest] = [];
    acc[rest].push(item);
    return acc;
  }, {});

  const allCategories = Array.from(new Set(allItems.map(item => item.category?.toLowerCase() || 'others')));

  const toggleRestaurantExpand = (restaurantName) => {
    setExpandedRestaurants(prev => ({
      ...prev,
      [restaurantName]: !prev[restaurantName],
    }));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search food or restaurant"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryTab, selectedCategory === 'all' && styles.categoryTabSelected]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={selectedCategory === 'all' ? styles.tabTextSelected : styles.tabText}>All</Text>
        </TouchableOpacity>
        {allCategories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryTab, selectedCategory === cat && styles.categoryTabSelected]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={selectedCategory === cat ? styles.tabTextSelected : styles.tabText}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {Object.entries(itemsByRestaurant).map(([restaurant, items]) => {
          const isExpanded = expandedRestaurants[restaurant];
          const restaurantOpen = restaurantStatus[restaurant] !== 'closed';
          const displayedItems = isExpanded ? items : items.slice(0, 2);

          return (
            <View key={restaurant} style={styles.restaurantSection}>
              <TouchableOpacity onPress={() => toggleRestaurantExpand(restaurant)}>
                <Text style={styles.restaurantNameHeader}>
                  {restaurant}
                  <Text style={{ color: restaurantOpen ? 'green' : 'red' }}>
                    {' '}({restaurantOpen ? 'Open' : 'Closed'})
                  </Text>
                </Text>
              </TouchableOpacity>

              <ScrollView
                horizontal={!isExpanded}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={!isExpanded ? { flexDirection: 'row' } : {}}
              >
                {displayedItems.map(item => {
                  const isUnavailable = !item.available || !restaurantOpen;
                  return (
                    <View key={item.id} style={styles.itemContainer}>
                      {getImageUri(item.imageBase64) ? (
                        <Image source={{ uri: getImageUri(item.imageBase64) }} style={styles.itemImage} />
                      ) : (
                        <View style={[styles.itemImage, { justifyContent: 'center', alignItems: 'center' }]}>
                          <Text>No Image</Text>
                        </View>
                      )}

                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
                        <Text style={{ marginTop: 4, fontWeight: '600' }}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </Text>

                        {item.category?.toLowerCase() === 'pizza' && (
                          <>
                            <Text style={{ fontWeight: '600', marginTop: 6 }}>Select Size:</Text>
                            <View style={styles.sizeSelector}>
                              {PIZZA_SIZES.map(size => {
                                const selected = pizzaSelection[item.id]?.size === size;
                                return (
                                  <TouchableOpacity
                                    key={size}
                                    style={[styles.sizeOption, selected && styles.sizeOptionSelected]}
                                    onPress={() => changePizzaSize(item.id, size)}
                                    disabled={isUnavailable}
                                  >
                                    <Text style={selected ? { color: 'white' } : {}}>{size}</Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </View>
                          </>
                        )}

                        <Text style={{ fontWeight: '600', marginTop: 6 }}>Veg/Non-Veg:</Text>
                        <View style={styles.sizeSelector}>
                          <TouchableOpacity
                            style={[
                              styles.sizeOption,
                              pizzaSelection[item.id]?.veg === true && styles.sizeOptionSelected,
                            ]}
                            onPress={() => setVegType(item.id, true)}
                            disabled={isUnavailable}
                          >
                            <Text style={pizzaSelection[item.id]?.veg === true ? { color: 'white' } : {}}>Veg</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.sizeOption,
                              pizzaSelection[item.id]?.veg === false && styles.sizeOptionSelected,
                            ]}
                            onPress={() => setVegType(item.id, false)}
                            disabled={isUnavailable}
                          >
                            <Text style={pizzaSelection[item.id]?.veg === false ? { color: 'white' } : {}}>Non-Veg</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.qtyContainer}>
                          <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, -1)} disabled={isUnavailable}>
                            <Text style={styles.qtyBtnText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyText}>{pizzaSelection[item.id]?.qty || 1}</Text>
                          <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, 1)} disabled={isUnavailable}>
                            <Text style={styles.qtyBtnText}>+</Text>
                          </TouchableOpacity>
                        </View>

                        <TextInput
                          placeholder="Add description (e.g., extra cheese)"
                          style={[styles.searchInput, { marginTop: 8 }]}
                          value={pizzaSelection[item.id]?.desc || ''}
                          onChangeText={(text) => setDescription(item.id, text)}
                          editable={!isUnavailable}
                        />

                        <TouchableOpacity
                          style={[styles.orderBtn, isUnavailable && { backgroundColor: 'gray' }]}
                          onPress={() => handleOrderNow(item)}
                          disabled={isUnavailable}
                        >
                          <Text style={styles.orderBtnText}>Order Now</Text>
                        </TouchableOpacity>

                        {addedMessageId === item.id && (
                          <TouchableOpacity onPress={() => navigation.navigate('UserCartScreen')}>
                            <Text style={{ color: 'green', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                              ✅ Added! Go to cart to confirm.
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // 🔁 Unchanged and updated styles
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 10,
    elevation: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'center',
  },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    margin: 5,
  },
  categoryTabSelected: {
    backgroundColor: '#ff6347',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  restaurantSection: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantNameHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ffebcd',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    color: '#ff6347',
    textTransform: 'capitalize',
  },
  itemContainer: {
    width: 240, // reduced size
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemInfo: {
    padding: 10,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  sizeSelector: {
    flexDirection: 'row',
    marginTop: 6,
  },
  sizeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sizeOptionSelected: {
    backgroundColor: '#ff6347',
    borderColor: '#ff6347',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: '#ff6347',
    padding: 6,
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  orderBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 