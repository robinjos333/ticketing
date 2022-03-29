import { Publisher, OrderCreatedEvent, Subjects } from '@ticketssg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
