const Book = class {
  // constructor 
  constructor(
    name,
    pages,
    color,
    readStatus
  )
  // properties
  {
    this.name = name,
    this.pages = pages,
    this.color = color,
    this.readStatus = readStatus
  }
  
  // methods
  changeStatus(newStatus) {
    this.readStatus = newStatus;
  }


}

export default Book;