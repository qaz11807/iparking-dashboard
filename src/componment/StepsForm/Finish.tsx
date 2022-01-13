import React from 'react';
import {Card} from '../Card';

interface StepProps {
    handler: ()=>void;
}
/**
 * the page that related  operation
 * @return {ReactElement}
 */
export default function Finish({handler}: StepProps) {
    return (
        <Card
            title={'Finish Order!'}
            actionLabel='Done'
            onAction={()=>{
                handler();
            }}
        />
    );
}


