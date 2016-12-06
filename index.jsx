import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import keys form 'lodash/keys';
import isObject from 'lodash/isObject';
import React { Component } from 'react';

function isRequireUpdateObject(o) {
  return Array.isArray(o) || (o && o.constructor === Object.prototype.constructor);
}

function deepDiff(o1, o2, p) {
  const notify = (status) => {
    console.warn('Update %s', status);
    console.log('%c before', 'font-weight: bold', o1);
    console.log('%c after', 'font-weight: bold', o2);
  }
  if (!isEqual(o1, o2)) {
    console.group(p);
    if([o1, o2].every(isFunction)) {
      notify('avoidable?');
    }
  } else if (![o1, o2].every(isRequireUpdateObject)) {
      notify('require');
  } else {
    const keys = _.union(keys(o1), keys(o2));
    for(const key of keys) {
      deepDiff(o1[key], o2[key], key);
    }
    console.groupEnd();
  } else if (o1 !== o2) {
    console.group(p);
    notify('avoidable');
    if (isObject(o1) && isObject(o2)) {
      const keys = _union(keys(o1), keys(o2));
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key);
      }
    }
    console.groupEnd();
  }
}

export default const whyDidYouUpdateEnhance = (ComposedComponent) => {
  let WhyDidYouUpdate = class extent Component {
    componentDidUpdate(prevProps, prevState) {
      deepDiff({
        state: prevState,
        props: prevProps
      },{
        state: this.state,
        props: this.props
      });
    }

    render() {
      return (
        <ComposedComponent  {...this.props} {...this.state}>
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

