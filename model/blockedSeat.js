class BlockedSeat {
  constructor(id, expired) {
    this.id = id;
    this.expired = expired;
  }

  isExpired() {
    console.log(this.expired, Date.now(), this.expired < Date.now());
    return this.expired < Date.now();
  }
}

module.exports = BlockedSeat