import React, { Component } from 'react';

class ImageTransmition {
    constructor(num, data, func, handleSuccess, handleErr, handleEnd){
        this.num = num;
        this.data = data;
        this.func = func;
        this.index = -1;
        this.handleSuccess = handleSuccess || function() {};
        this.len = data.length;
        this.handleErr = handleErr || function() {};
        this.handleEnd = handleEnd || function() {};
        this.currentIndex = -1;      
    }

    

}