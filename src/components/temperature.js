import React, { Component } from 'react';

export default function Temperature() {
  return (
    <div id="temperature">
      <span id="degrees"></span>
      <span id="unit">
        <a href="#">℃</a>
      </span>
    </div>
  );
}
