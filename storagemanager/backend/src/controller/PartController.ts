import {getRepository} from 'typeorm';
import {NextFunction, Request, Response} from 'express';
import {Part} from '../entity/Part';

export class PartController {

  private partRepository = getRepository(Part);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const parts = await this.partRepository.find();
      response.json(parts);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const part = await this.partRepository.findOne(id);
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
      await this.partRepository.createQueryBuilder().update(Part).set(request.body).where("id = :id", {id: request.body.id}).execute();
      response.json({success: true});
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const entity = this.partRepository.create(request.body);
      const entityAdded = await this.partRepository.save(entity);
      response.json(entityAdded);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const partToRemove = await this.partRepository.findOne(id);
      await this.partRepository.remove(partToRemove);
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
