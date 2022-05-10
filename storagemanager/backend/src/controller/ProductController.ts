import {createQueryBuilder, getRepository} from 'typeorm';
import {NextFunction, Request, Response} from 'express';
import {Product} from '../entity/Product';
import {ProductPart} from '../entity/ProductPart';
import {Part} from '../entity/Part';

export class ProductController {

  private productRepository = getRepository(Product);
  private partRepository = getRepository(Part);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await this.productRepository.find();
      response.json(products);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const product = await this.productRepository.findOne(id);
      if (!product) {
        this.handleError(response, 404, 'No entity with the given id.');
        return;
      }
      response.json(product);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      console.log(request.body);
      const entity = this.productRepository.create(request.body);
      const entityAdded = await this.productRepository.save(entity);
      response.json(entityAdded);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const productToRemove = await this.productRepository.findOne(id);
      await this.productRepository.remove(productToRemove);
      response.json({success: true});
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  handleError(response, statu: number = 500, message: string = 'Server error occurred.') {
    response.status(statu).json({message});
  }
}
