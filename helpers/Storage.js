import * as SecureStore from 'expo-secure-store';

     async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      
      async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
          return result;
        } else {
          alert('No values stored under that key.');
          return "no token"
        }
      }

export {save, getValueFor}
