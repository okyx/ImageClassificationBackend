const Fruit = require('../../domain/Predict/Fruit');
const tf = require('@tensorflow/tfjs-node');


class FruitPredict extends Fruit {
  constructor() {
    super();
  }
  async predict(image){
    const MODEL_URL = 'file://src/assets/models/predictFruits/model.json';
    const model = await tf.loadLayersModel(MODEL_URL);
    const result = model.predict(image);
    return result;
  }
}

module.exports = FruitPredict;