import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
//import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, switchMap, withLatestFrom, map } from 'rxjs/operators';
import { SignalrClient, SignalrConnection } from 'ngx-signalr-websocket';
//import * as fromRoot from '@app/store/reducers';


@Injectable({
  providedIn: 'root'
})
export class AppSignalrService implements OnDestroy {

  private client: SignalrClient;
  private connection$ = new BehaviorSubject<SignalrConnection | null>(null);

  private readonly readyConnection$ = this.connection$.pipe(filter(connection => !!connection && connection.opened));

  constructor(/*store: Store<fromRoot.State>,*/ httpClient: HttpClient) {

    this.client = SignalrClient.create(httpClient);

    /*store.select(fromRoot.selectSignalrHubUri) Я не ебу что это, какаято хуетень со стором
      .pipe(
        switchMap(uri => this.client.connect(uri)),
        retryWhen(errors => errors.pipe(
          tap(error => console.error(`SignalR connection error: ${error}`)),
          delay(5000)
        )))
      .subscribe(connection => {
        this.disconnect();
        this.connection$.next(connection);
      });*/
  }

  getLastMessages(): Observable<string[]> {
    return this.readyConnection$
      .pipe(switchMap(connection => connection.invoke<string[]>('GetLastMessages', 10)));
  }

  sendMessage(user: string, message: string): void {
    this.readyConnection$
      .pipe(switchMap(connection => connection.send('SendMessage', user, message)));
  }

  onReceiveMessage(): Observable<{ user: string, message: string }> {
    return this.readyConnection$
      .pipe(
        switchMap(connection => connection.on<[string, string]>('ReceiveMessage')),
        map(([user, message]) => { user, message }));
  }

  getUserMessagesStream(user: string): Observable<string> {
    return this.readyConnection$
      .pipe(switchMap(connection => connection.stream<string>('GetUserMessagesStream', user)));
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private disconnect(): void {
    if (this.connection$.value) { this.connection$.value.close(); }
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketsService {
//
//   constructor() {
//   }
// }
//
// export class SignalRService implements OnDestroy {
//   public readonly client: SignalrClient;
//   public readonly connection;
//   constructor(private httpClient: HttpClient) {
//     this.client = new SignalrClient.create(httpClient);
//     this.connection = this.client.connect("https://localhost:55434");
//
//   }
//
//   // Start Hub Connection and Register events
//   public startConnection = (interval = 500, volume = 1000, live = false, updateAll = true) => {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .configureLogging(signalR.LogLevel.Trace)
//       .withUrl('https://www.infragistics.com/angular-apis/webapi/streamHub')
//       .build();
//     this.hubConnection
//       .start()
//       .then(() => {
//       ...
//         this.registerSignalEvents();
//         this.broadcastParams(interval, volume, live, updateAll);
//       })
//       .catch(() => { ...
//       });
//   }    // Change the parameters like frequency and data volume
//   public broadcastParams = (frequency, volume, live, updateAll = true) => {
//     this.hubConnection.invoke('updateparameters', frequency, volume, live, updateAll)
//       .then(() => console.log('requestLiveData', volume))
//       .catch(err => {
//         console.error(err);
//       });
//   }    // Register events
//   private registerSignalEvents() {
//     this.hubConnection.onclose(() => {
//       this.hasRemoteConnection = false;
//     });
//     this.hubConnection.on('transferdata', (data) => {
//       this.data.next(data);
//     })
//   }
