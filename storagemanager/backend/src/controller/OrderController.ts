import {getRepository} from 'typeorm';
import {NextFunction, Request, Response} from 'express';
import {Order} from '../entity/Order';
import {Product} from '../entity/Product';
import {Part} from '../entity/Part';

export class OrderController {

  private orderRepository = getRepository(Order);
  private productRepository = getRepository(Product);
  private partRepository = getRepository(Part);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const parts = await this.orderRepository.find();
      response.json(parts);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const part = await this.orderRepository.findOne(id);
      if (!part) {
        this.handleError(response, 404, 'No entity with the given id.');
        return;
      }
      response.json(part);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      await this.orderRepository.createQueryBuilder().update(Order).set(request.body).where("id = :id", {id: request.body.id}).execute();
      response.json({success: true});
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {

      let order = request.body.order;
      let usedParts = request.body.usedParts;

      let isEnoughAmount = true;

      for (const usedPart of usedParts) {
        const part = await this.partRepository.findOne(usedPart.partId);
        if (part.amount < usedPart.amount) {
          isEnoughAmount = false;
        }
      }

      if (isEnoughAmount) {
        try {
          const entity = this.orderRepository.create(order);
          const entityAdded = await this.orderRepository.save(entity);
          response.json({enough: true});
        } catch (error) {
          console.error(error);
          this.handleError(response);
        }
      } else {
        response.json({enough: false});
      }

    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const partToRemove = await this.orderRepository.findOne(id);
      await this.orderRepository.remove(partToRemove);
      response.json({success: true});
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  handleError(response, status: number = 500, message: string = 'Server error occurred.') {
    response.status(status).json({message});
  }
}
