class TagIndexHolder{
  constructor(){
    this.tagIndex = 0
    this.maxTagIndex = 3
  }

  getTagIndex(){
    return this.tagIndex
  }

  updateTagIndex(){
    if (this.tagIndex === 3){
      this.tagIndex = 0
    } else {
      this.tagIndex++
    }
  }
}

module.exports = {
  TagIndexHolder
}