const NewImage = require('../../domain/Image/entities/NewImage');
const PredictResult = require('../../domain/Predict/entities/PredictResult');
const jsonData = require('../../assets/models/predictFruits/labels.json');

class ImageUseCase {
  constructor({ imageService, predictService }) {
    this._imageService = imageService;
    this._predictService = predictService;
  }
  async execute(payload) {
    new NewImage(payload.hapi.headers);
    const image = await this._imageService.fetchImage(payload);
    const result = await this._predictService.predict(image);
    const isPredicted = Math.max(...result.greater(0.9).as1D().dataSync());
    if (isPredicted) {
      const index = result.as1D().argMax().dataSync()[0];
      const hasil = jsonData[index];
      const predictResult = new PredictResult({ hasil });
      return predictResult;
    }else {
      const predictResult = 'maaf gambar yang kamu masukan tidak dapat diprediksi'
      return predictResult;
    }
    
  }
}

module.exports = ImageUseCase;