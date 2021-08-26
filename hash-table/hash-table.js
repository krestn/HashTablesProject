// Use these to store the key/value pairs in your hash table
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), delete O(1)

  constructor(numBuckets = 2) {
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null)
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0 ; i < key.length ; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    return this.hash(key) % this.data.length;
  }

  read(key) {

   let index = this.hashMod(key)
   let currentValue = this.data[index];
   while(currentValue){
     if(currentValue.key === key){
       return currentValue.value
     }
     currentValue = currentValue.next
   }
   return

  }


  insert(key, value) {
    if(this.count/this.capacity>=0.7){
      this.resize()
    }
    let index = this.hashMod(key)
    let currentPair = this.data[index]
    while(currentPair && currentPair.key !== key){
      currentPair = currentPair.next;
    }
    if(currentPair){
      currentPair.value = value
    } else {
      const newPair = new KeyValuePair(key,value);
    newPair.next = this.data[index]
    this.data[index] = newPair
    this.count++
    }
  }


  resize() {

    let copy = this.data;
    this.capacity = this.capacity*2;
    this.data = new Array(this.capacity).fill(null)
    this.count = 0;
    let currentValue = null;
    for(let i=0; i<copy.length;i++){
      currentValue = copy[i];
      while(currentValue){
        this.insert(currentValue.key,currentValue.value);
        currentValue = currentValue.next
      }
    }
  }


  delete(key) {

    let index = this.hashMod(key)
    let pair = this.data[index]
    let lastPair = null

    while(pair && pair.key !== key){
      lastPair = pair
      pair = lastPair.next
    }

    if(!pair){
      console.log('key not found')
    } else {
      if(!lastPair){
        this.data[index] = pair.next
      } else {
        lastPair.next = pair.next
      }
      this.count--
    }
}
}


module.exports = HashTable;
