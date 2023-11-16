import { EntityRepository, Repository } from 'typeorm';
import { Attribute } from '../entities/attribute.entity';

@EntityRepository(Attribute)
export class AttributeRepository extends Repository<Attribute> {}
