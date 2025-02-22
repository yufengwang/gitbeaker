import { BaseResource } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
  Camelize,
} from '../infrastructure';

export interface BroadcastMessageSchema extends Record<string, unknown> {
  message: string;
  starts_at: string;
  ends_at: string;
  color: string;
  font: string;
  id: number;
  active: boolean;
  target_path: string;
  broadcast_type: string;
  dismissable: boolean;
}

export class BroadcastMessages<C extends boolean = false> extends BaseResource<C> {
  all(options?: PaginatedRequestOptions) {
    return RequestHelper.get<BroadcastMessageSchema[]>()(this, 'broadcast_messages', options);
  }

  create(options?: Camelize<Omit<BroadcastMessageSchema, 'id'>> & Sudo) {
    return RequestHelper.post<BroadcastMessageSchema>()(this, 'broadcast_messages', options);
  }

  edit(broadcastMessageId: number, options?: Camelize<Omit<BroadcastMessageSchema, 'id'>> & Sudo) {
    return RequestHelper.put<BroadcastMessageSchema>()(
      this,
      `broadcast_messages/${broadcastMessageId}`,
      options,
    );
  }

  remove(broadcastMessageId: number, options?: Sudo) {
    return RequestHelper.del()(this, `broadcast_messages/${broadcastMessageId}`, options);
  }

  show(broadcastMessageId: number, options?: BaseRequestOptions) {
    return RequestHelper.get<BroadcastMessageSchema>()(
      this,
      `broadcast_messages/${broadcastMessageId}`,
      options,
    );
  }
}
