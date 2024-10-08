import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function getCurrentRouteName() {
  return navigationRef.current?.getCurrentRoute().name;
}

export function popToTop() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
}

export function reset(name) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name}],
  });
}

export function goBack() {
  navigationRef.current?.goBack();
}
