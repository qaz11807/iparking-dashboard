import React from 'react';
import {Order} from '../../models/order';
import {datePrettyPrint} from '../../utils/date-helper';
import {Card} from '../Card';
import {Label} from '../Label';

interface OrderStateProps {
    order: Order
    handler: ()=>void;
}
/**
 * the page that related  operation
 * @return {ReactElement}
 */
export default function OrderState({order, handler}: OrderStateProps) {
    return (
        <Card
            title={'Order'}
            actionLabel={'Tracking'}
            onAction={()=>{
                handler();
            }}
        >
            <Label
                label='id'
                value={order.id}
            />
            <Label
                label='Enter Time'
                value={datePrettyPrint(order.enterTime)}
            />
            <Label
                label='Exit Time'
                value={order.exitTime ? datePrettyPrint(order.exitTime) : null}
            />
            <Label
                label='Status'
                value={order.status}
            />
            <Label
                label='License'
                value={order.Plate?.license}
            />
        </Card>
    );
}


