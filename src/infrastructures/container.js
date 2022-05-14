const { createContainer } = require('instances-container');
//usercase
const ImageUseCase = require('../applications/predict/ImageUseCase');
//domain
const Fruit = require('../domain/Predict/Fruit');
const Image = require('../domain/Image/Image');
// service
const FruitPredict = require('../infrastructures/modelPreidict/FruitPredict');
const ImageService = require('../infrastructures/modelPreidict/ImageService');

const container = createContainer();
container.register([
  {
    key: Fruit.name,
    Class: FruitPredict
  },
  {
    key: Image.name,
    Class: ImageService,
  }
]);

container.register([
  {
    key: ImageUseCase.name,
    Class: ImageUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'imageService',
          internal: Image.name
        },
        {
          name: 'predictService',
          internal: Fruit.name,
        },
      ]    
    }
  }
])
module.exports = container;