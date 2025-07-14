import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { useState, useEffect } from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import { colors } from './constants';

const LiquidCircle = ({ label = "Skill", percentage = 80, variant="yellow", startPercentage = 0 }) => {
    const [value, setValue] = useState(startPercentage);

    const radius = 80;
    const interpolate = interpolateRgb(colors[variant].start, colors[variant].end);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];

    const handleMouseEnter = () => {
        setValue(percentage);
    };

    const handleMouseLeave = () => {
        setValue(startPercentage);
    };

    useEffect(() => {
        setValue(startPercentage);
    }, [startPercentage]);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
        >
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={radius * 2}
                height={radius * 2}
                value={value}
                percent=""
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const labelStyle = {
                        fontSize: textPixels * 0.35,
                        fontWeight: 'bold'
                    };

                    return (
                        <tspan>
                            <tspan x="0" dy="0.35em" style={labelStyle}>{label}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={5}
				gradient
				margin={0}
				innerRadius={0.99}
                gradientStops={gradientStops}
                circleStyle={{
                    fill: fillColor,
                    stroke: fillColor,
                    strokeWidth: 1
                }}
                waveStyle={{
                    fill: fillColor
                }}
                textStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
            />
        </div>
    );
};

export default LiquidCircle;