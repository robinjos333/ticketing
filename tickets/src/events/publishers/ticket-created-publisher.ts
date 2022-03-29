import { Publisher, Subjects, TicketCreatedEvent } from '@ticketssg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
