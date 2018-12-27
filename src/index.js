import angular from 'angular';
import customerView from './customer-view';

const customerViewComponents = angular.module('ccms.customerView', [
    customerView
]);

export default customerViewComponents.name;
