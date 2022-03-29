import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketssg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
