import angular from 'angular';
import customerView from './customer-view';

const customerViewComponents = angular.module('ccms.customerView', [
    customerView
]);
customerViewComponents.version = process.env.VERSION;
export default customerViewComponents.name;
