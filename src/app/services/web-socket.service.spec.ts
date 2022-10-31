import { TestBed } from '@angular/core/testing';

import { WebSocketService } from './web-socket.service';

describe('WebSocketService: value', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return localhost socket.io', () => {
    expect(service.listen).toEqual('http://localhost:3000');
  });
});

fdescribe('Service: value', () => {
  let service: WebSocketService;

  beforeEach(() => {
    service = new WebSocketService();
  });

  it('should return real value', () => {
    expect(service.getValue()).toBe('http://localhost:3000');
  });

})
