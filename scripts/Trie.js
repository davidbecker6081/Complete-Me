import Node from './Node'

export default class Trie {
  constructor(node) {
    this.root = null
    this.wordCount = 0
    this.wordFreq = []
  }

  insert(word) {
    let node = new Node()

    if (!this.root) {
      this.root = node
    }

    let letters = [...word.toLowerCase()]
    let currentNode = this.root

    letters.forEach((letter, i) => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
      }
      currentNode = currentNode.children[letter]
    })

    if (currentNode.isWord !== true) {
      currentNode.isWord = true
      this.wordCount++
    }
    // console.log(JSON.stringify(this.root, null, 4))
  }

  count() {
    return this.wordCount
  }

    select(word) {
      let wordObj = {
        word: word,
        freq: 1
      }

      let foundWord = false

      if (this.wordFreq.length === 0) {
        this.wordFreq.push(wordObj)
        foundWord = true
      } else if (this.wordFreq.length > 0) {
        this.wordFreq.forEach((obj) => {
          if (word === obj.word) {
            foundWord = true
            obj.freq += 1
          }
        })
      }

      if (foundWord === false && this.wordFreq.length > 0) {
        this.wordFreq.push(wordObj)
      }

    }

  suggest(word) {
    let wordAsArray = [...word];
    let currNode = this.root;
    let suggestionsArray = [];

    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]]
      //console.log('CURR NODE:', currNode);
    }

    // currNode now refers to the last leter in our word
    const traverseTheTrie = (word, currNode) => {
      let keys = Object.keys(currNode.children);
      for (let k = 0; k < keys.length; k++) {
        // console.log('CURRENT NODE:', currNode, 'KEYS:', keys);
        const child = currNode.children[keys[k]];
        let newString = word + child.letter;
        if (child.isWord) {
          suggestionsArray.push(newString);
        }
        traverseTheTrie(newString, child);
      }
    };

    if (currNode && currNode.isWord) {
      suggestionsArray.push(word)
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }
    let sortedArray = []
    this.wordFreq.forEach((wordObj) => {
      suggestionsArray.forEach((arrayWord, i) => {
        if (wordObj.word === arrayWord) {
          sortedArray.push(wordObj)
          suggestionsArray.splice(i, 1)
        }
      })
    })
    sortedArray.sort((a,b) => {
      return a.freq - b.freq
    })
    sortedArray.forEach((obj) => {
      suggestionsArray.unshift(obj.word)
    })

    return suggestionsArray;
  }


  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}
