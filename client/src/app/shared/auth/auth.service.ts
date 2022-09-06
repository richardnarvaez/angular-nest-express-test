import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    phone: '',
  });

  constructor(private http: HttpClient) {}

  login(user: any) {
    // return this.http.post(
    //   'http://polizas.rubenvn.com/api/v1/centralizadas/login',
    //   {
    //     xmlDatosCas:
    //       "<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>    <cas:authenticationSuccess>        <cas:user>rvalencia@espoch.edu.ec</cas:user>        <cas:attributes>            <cas:sub>Fk2XFjEh0bmSh9nYgpa-y3i7dj7lqDA6-y_88AXjvX4</cas:sub>            <cas:perid>34882</cas:perid>            <cas:isFromNewLogin>true</cas:isFromNewLogin>            <cas:authenticationDate>2022-09-02T20:10:51.048-05:00[America/Guayaquil]</cas:authenticationDate>            <cas:clientName>Institucional</cas:clientName>            <cas:cedula>0803051150</cas:cedula>            <cas:successfulAuthenticationHandlers>ClientAuthenticationHandler</cas:successfulAuthenticationHandlers>            <cas:given_name>Ruben Dario</cas:given_name>            <cas:credentialType>ClientCredential</cas:credentialType>            <cas:upn>rvalencia@espoch.edu.ec</cas:upn>            <cas:authenticationMethod>ClientAuthenticationHandler</cas:authenticationMethod>            <cas:name>Ruben Dario Valencia Navarrete</cas:name>            <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>            <cas:family_name>Valencia Navarrete</cas:family_name>            </cas:attributes>    </cas:authenticationSuccess></cas:serviceResponse>",
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );
    // return this.http.post(
    //   'http://192.168.1.105:4000/api/v1/centralizadas/login',
    //   {
    //     xmlDatosCas:
    //       "<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>    <cas:authenticationSuccess>        <cas:user>rvalencia@espoch.edu.ec</cas:user>        <cas:attributes>            <cas:sub>Fk2XFjEh0bmSh9nYgpa-y3i7dj7lqDA6-y_88AXjvX4</cas:sub>            <cas:perid>34882</cas:perid>            <cas:isFromNewLogin>true</cas:isFromNewLogin>            <cas:authenticationDate>2022-09-02T20:10:51.048-05:00[America/Guayaquil]</cas:authenticationDate>            <cas:clientName>Institucional</cas:clientName>            <cas:cedula>0803051150</cas:cedula>            <cas:successfulAuthenticationHandlers>ClientAuthenticationHandler</cas:successfulAuthenticationHandlers>            <cas:given_name>Ruben Dario</cas:given_name>            <cas:credentialType>ClientCredential</cas:credentialType>            <cas:upn>rvalencia@espoch.edu.ec</cas:upn>            <cas:authenticationMethod>ClientAuthenticationHandler</cas:authenticationMethod>            <cas:name>Ruben Dario Valencia Navarrete</cas:name>            <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>            <cas:family_name>Valencia Navarrete</cas:family_name>            </cas:attributes>    </cas:authenticationSuccess></cas:serviceResponse>",
    //   },
    //   {
    //     withCredentials: true,
    //   }
    // );
    // return this.http.post('http://192.168.100.45:3000/api/login', user, {
    //   withCredentials: true,
    // });
    return this.http.post('http://localhost:3000/api/login', user, {
      withCredentials: true,
    });
  }

  profile(): Observable<UserModel> {
    // this.http
    //   .get<UserModel>('http://localhost:3000/user-profile', {
    //     withCredentials: true,
    //   })
    //   .subscribe((user) => {
    //     console.log(user);
    //   });
    // return this.http.get<UserModel>(
    //   'http://192.168.100.45:4000/api/v1/plazos',
    //   {
    //     withCredentials: true,
    //   }
    // );
    return this.http.get<UserModel>('http://localhost:3000/user-profile', {
      withCredentials: true,
    });
  }

  refreshCookie() {
    return this.http.get('http://localhost:3000/refresh-token', {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.get('http://localhost:3000/logout', {
      withCredentials: true,
    });
  }

  saveUserToLocalStorage(user: UserModel) {
    this.userProfile.next(user);
    localStorage.setItem('user-profile', JSON.stringify(user));
  }

  loadUserFromLocalStorage(): UserModel {
    if (this.userProfile.value.id == 0) {
      let fromLocalStorage = localStorage.getItem('user-profile');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }
}
