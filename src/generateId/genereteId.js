class GenereteId {
  constructor(model) {
    this.model = model;
  }

  async Exe() {
    const { model } = this;
    const datas = await model.findMany();
    const temporarilyId = (await datas.length) + 1;
    const count = await model.count({
      where: {
        id: temporarilyId,
      },
    });
    if (!count) {
      return temporarilyId;
    } else {
      for (let i = 1; i <= datas.length; i++) {
        const count = await model.count({
          where: {
            id: i,
          },
        });
        if (!count) {
          return i;
        }
      }
    }
  }
}
export default GenereteId;
