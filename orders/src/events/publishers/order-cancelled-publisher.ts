import { Publisher, Subjects, OrderCancelledEvent } from '@ticketssg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
