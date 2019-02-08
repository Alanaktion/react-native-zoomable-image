import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';

export default class ZoomableImage extends React.Component {
    static propTypes = {
        source: PropTypes.object.isRequired,
        maxZoom: PropTypes.number,
    }

    state = {
        componentWidth: null,
        componentHeight: null,
        width: null,
        height: null,
        minScale: 1,
        startScale: 1,
        scale: 1,
    }

    _onLayout = e => {
        const { width, height } = e.nativeEvent.layout;
        this.setState({
            componentWidth: width,
            componentHeight: height,
        }, this._updateScale);
    }

    _onLoad = e => {
        const { width, height } = e.nativeEvent.source;
        this.setState({
            width,
            height,
        }, this._updateScale);
    }

    _updateScale = () => {
        const minScale = Math.min(1, this.state.componentWidth / this.state.width, this.state.componentHeight / this.state.height);
        this.setState({
            minScale,
            startScale: minScale,
            scale: minScale,
        });
    }

    render() {
        const maxZoom = this.props.maxZoom || 3;
        const baseWidth = Math.min(this.state.componentWidth, this.state.width);
        const baseHeight = Math.min(this.state.componentHeight, this.state.height);
        const scale = Math.max(this.state.scale, this.state.minScale);
        const width = baseWidth * scale;
        const height = baseHeight * scale;
        // const left = this.state.scale > this.state.minScale ? (baseWidth - width) / 4 : 0;
        // const top = this.state.scale > this.state.minScale ? (baseHeight - height) / 4 : 0;
        const left = 0, top = 0;

        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                onLayout={this._onLayout}>
                <PinchGestureHandler
                    onGestureEvent={e => {
                        const { scale, focalX, focalY } = e.nativeEvent;
                        this.setState({
                            scale: Math.min(this.state.startScale * scale, maxZoom),
                        });
                    }}
                    onHandlerStateChange={() => {
                        this.setState({
                            startScale: this.state.scale,
                        });
                    }}>
                    <Image
                        style={{ width, height, left, top }}
                        onLoad={this._onLoad}
                        source={this.props.source} />
                </PinchGestureHandler>
            </View>
        );
    }
}
