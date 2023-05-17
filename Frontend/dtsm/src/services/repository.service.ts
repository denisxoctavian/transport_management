import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
    providedIn: 'root'
  })
  export class RepositoryService {
  
    constructor(private http: HttpClient, private keycloak: KeycloakService) { }
  
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      acceptText: new HttpHeaders({
        'Accept': 'text/html'
      })
    }
    /** Add a gate in DB if location mat-select has any value selected and the gate is not already in DB
     * This endpoint is used by location managers only
     * @param body - gate information like id_location, id, etc.
     */
    public addGate(body:any): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(`http://localhost:8100/gate/add`, JSON.stringify(body), { headers }).pipe();
    }
    /** Delete a gate from DB with specified id
     * This endpoint is used by location managers only
     * @param id - id of the gate that we want to delete
     */
    public deleteGate(id:number): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.delete('http://localhost:8100/gate/delete/'+id, {headers}).pipe();
    }
    /** Return a gate from the DB with specified id
     * This endpoint is used by location managers only
     * @param id - id of the gate that we want to find
     */
    public findGate(id:number): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/gate/find/${id}`, {headers}).pipe();
    }
    /**
     * Return a location from the DB with specified id
     * @param id - id of the location that we want to find
     * @returns 
     */
    public findLocation(id:number): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/location/find/${id}`, {headers}).pipe();
    }
    /** Return all gates from DB with specified location id 
     * This endpoint is used by location managers only
     * @param id - id of the location with wanted gates
     * @returns 
     */
    public getGatesOfLocation(id:number):Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/gate/location/${id}`, {headers}).pipe();
    }
    /** Return all locations from DB
     * This endpoint is used by location managers only
     * @returns 
     */
    public getAllLocations(): Observable<any> {
      return this.http.get(`http://localhost:8100/location/all`).pipe();
    }
    /** Add a transport in DB
     * This endpoint is used by drivers only
     * @param body - information about transport like driver's id, delivery date, shipping date, etc.
     */
    public addTransport(body:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(`http://localhost:8100/transport/add`, JSON.stringify(body), { headers }).pipe();
    }
    /** Delete a transport from DB with specified id
     * This endpoint is used by location managers only
     * @param id - id of the transport that we want to delete
     */
    public deleteTransport(id:number): Observable<any>{
      return this.http.delete(`http://localhost:8100/transport/delete/${id}`,{}).pipe();
    }
    /** Update a transport from DB with specified id and body
     * This endpoint is used by location managers only
     * @param id - id of the transport that we want to update
     * @param body - updated information of the transport
     */
    public updateTransport(id:number,body:any): Observable<any>{
      return this.http.put(`http://localhost:8100/transport/update/${id}`,body, {}).pipe();
    }
    /** Add a appointment in DB after the driver click on "Complete" button
     * This endpoint is used by drivers only
     * @param body - information about appointment like arrival time, id of gate, etc.
     * @returns 
     */
    public addTransportSchedule(body:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(`http://localhost:8100/schedule/add`, JSON.stringify(body), { headers }).pipe();
    }
    /** Update the appointment in DB after location manager confirm it
     * This endpoint is used by location managers only
     * @param id - id of the appointment that we want to update
     * @param body - updated information of the appointment
     * @returns 
     */
    public updateTransportSchedule(id:number,body:any): Observable<any>{
      return this.http.put(`http://localhost:8100/schedule/update/${id}`,body, {}).pipe();
    }
    /** Return all the transport from the location of the logged location manager
     * This endpoint is used by location managers only
     * @param id - id of the wanted location
     * @returns 
     */
    public getTransportFromLocation(id:any):Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/transport/location/${id}`,{ headers }).pipe();
    }
    /** Delete an appointment from DB if the location manager decline the appoinment
     * This endpoint is used by location managers only
     * @param id - id of the appointment that we want to delete
     * @returns 
     */
    public deleteTransportSchedule(id:number): Observable<any>{
      return this.http.delete(`http://localhost:8100/schedule/delete/${id}`,{}).pipe();
    }
    /** Return all available hours from a specified location and delivery date.
     * This endpoint is used by drivers only
     * @param idLocation - id of the wanted location
     * @param deliveryDate - delivery date that we want to check if it has hours available for an new appointment
     * @returns 
     */
    public getNotAvailableHours(idLocation:any,deliveryDate:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/transport/available/${idLocation}?deliveryDate=${deliveryDate}`,{ headers }).pipe();
    }
    /** Return all possible information about a transport with a specified driver id
     * This endpoint is used by location managers and drivers
     * @param idDriver - id of the driver 
     * @returns 
     */
    public getTransportInformation(idDriver:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/transport/information?id=${idDriver}`,{ headers }).pipe();
    }
    /** Return all appointments from a specified location
     * This endpoint is used by location managers only
     * @param idLocation - id of the location where we get all the appointments with status 'Pending'
     * @returns 
     */
    public getAppointmentsFromLocation(idLocation:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/schedule/location/${idLocation}`,{ headers }).pipe();
    }
    /** Return all location managers from DB
     * This endoint is used by admins only
     * @returns 
     */
    public getAllManagers(): Observable<any> {
      return this.http.get(`http://localhost:8100/manager/all`).pipe();
    }
    /** Add a location manager in DB
     * This endpoint is used by admins only
     * @param body - information about location manager
     * @returns 
     */
    public addManager(body:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(`http://localhost:8100/manager/add`, JSON.stringify(body), { headers }).pipe();
    }
    /** Return a location manager with a specified email
     * This endpoint is used by location managers only
     * @param email - email of the location manager that we want to find
     * @returns 
     */
    public findManagerByEmail(email:any):Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.get(`http://localhost:8100/manager/finde/${email}`, { headers }).pipe();
    }
    /** Update a location manager in DB with specified id and body
     * This endpoint is used by admins only
     * @param id - id of the manager that we want to update
     * @param body - udpated information of the location manager
     * @returns 
     */
    public updateManager(id:number,body:any): Observable<any> {
      return this.http.put(`http://localhost:8100/manager/update/${id}`,body, {}).pipe();
    }
    /** Delete a location manager from DB with sepcified id
     * This endpoint is used by admins only
     * @param id - id of the manager that we want to delete
     * @returns 
     */
    public deleteManager(id:number): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.delete('http://localhost:8100/manager/delete/'+id, {headers}).pipe();
    }
    /** Return all drivers from DB
     * This endpoint is used by admins only
     * @returns 
     */
    public getAllDrivers(): Observable<any> {
      return this.http.get(`http://localhost:8100/driver/all`).pipe();
    }
    /** Update a driver in DB with specified id and body
     * This endpoint is used by admins only
     * @param id - id of the driver that we want to update
     * @param body - updated information about driver
     * @returns 
     */
    public updateDriver(id:number,body:any): Observable<any> {
      return this.http.put(`http://localhost:8100/driver/update/${id}`,body, {}).pipe();
    }
    /** Add a driver in DB
     * This endpoint is used by admins only
     * @param body - information about the driver
     * @returns 
     */
    public addDriver(body:any): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(`http://localhost:8100/driver/add`, JSON.stringify(body), { headers }).pipe();
    }
    /** Delete a driver from DB with specified id
     * This endpoint is used by admins only
     * @param id - id of the driver that we want to delete
     * @returns 
     */
    public deleteDriver(id:number): Observable<any>{
      const headers = { 'Content-Type': 'application/json' };
      return this.http.delete('http://localhost:8100/driver/delete/'+id, {headers}).pipe();
    }
    /** Return a driver from DB with specified email
     * This endpoint is used by drivers only
     * @param email - email of the driver that we want to get
     * @returns 
     */
    public getDriverByEmail(email:string): Observable<any> {
      return this.http.get(`http://localhost:8100/driver/finde/${email}`).pipe();
    }/**
     * 
     * @param id - id of the driver that we want to get
     * @returns 
     */
    public getDriverById(id:any): Observable<any> {
      return this.http.get(`http://localhost:8100/driver/find/${id}`).pipe();
    }
    /** Delete the user from Keycloak server with specified id
     * This endpoint is used by admins only
     * @param id - id of the keycloak user that we want to delete
     * @returns 
     */
    public deleteKeyCloakUserById(id:string){
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  this.keycloak.getToken()
      };
      return this.http.delete(`http://localhost:8080/auth/admin/realms/angular-dtsm/users/${id}`,{ headers }).pipe();
    }
    /** Return an user from Keycloak server with specified email
     * This endpoint is used by admins only
     * @param email - email of the keycloak user that we want to get
     * @returns 
     */
    public getKeyCloakUserByEmail(email:string){
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  this.keycloak.getToken()
      };
      return this.http.get(`http://localhost:8080/auth/admin/realms/angular-dtsm/users?email=${email}`,{ headers }).pipe();
    }
    /** Update an user in Keycloak server with specified id and body
     * This endpoint is used only by admins
     * @param id - id of the keycloak user that we want to update
     * @param body - updated information of the keycloak user
     * @returns 
     */
    public updateUserKeyCloak(id:number,body:any): Observable<any>{

      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  this.keycloak.getToken()
      };
      return this.http.put(`http://localhost:8080/auth/admin/realms/angular-dtsm/users/${id}`,body,{ headers }).pipe();
    }
    /** Add an user in Keycloak server 
     * This endpoint is used only by admins
     * @param body - information of the keycloak user
     * @returns 
     */
    public addUserKeyCloak(body:any): Observable<any>{

      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  this.keycloak.getToken()
      };
      return this.http.post(`http://localhost:8080/auth/admin/realms/angular-dtsm/users`, body, { headers }).pipe();
    }
    /** Send an email to an email address
     * This enpoint is used by all roles
     * @param body - a template with other params and and email where we want to send the message
     * @returns 
     */
    public sendEmail(body:any): Observable<any> {
      const headers = { 
        'Content-Type': 'application/json',
      };
      return this.http.post('https://api.emailjs.com/api/v1.0/email/send', JSON.stringify(body),{headers} ).pipe();
    }
  
  }    
  