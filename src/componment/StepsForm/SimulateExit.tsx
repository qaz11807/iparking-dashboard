import React from 'react';
import {useState} from 'react';
import {Socket} from 'socket.io-client';
import {OrderRepo, SimulateRepo} from '../../api/service';
import {Order} from '../../models/order';
import {datePrettyPrint} from '../../utils/date-helper';
import {Card} from '../Card';
import {InputText} from '../Form/FormInputs';
import {Label} from '../Label';

export const handleExit = (socket: Socket, onSuccess: (order: Order)=> void, onFailed: (err: Error)=> void)=>{
    return async (input: string) => {
        if (!socket) {
            return;
        }
        try {
            if (socket) {
                const id = await SimulateRepo.exit(input.trim());
                socket.removeListener(`order:${id}`);
                const order = await OrderRepo.get(id);
                onSuccess(order);
            }
        } catch (err) {
            if (err instanceof Error) {
                onFailed(err);
            }
        }
    };
};

interface StepProps {
    order: Order
    handler: (input: string)=>void;
}
/**
 * the page that related  operation
 * @return {ReactElement}
 */
export default function SimulateExit({order, handler}: StepProps) {
    const [input, setInput] = useState<string>('');

    return (
        <Card
            title={'Simulate Exit'}
            actionLabel='Exit!'
            onAction={()=>{
                handler(input);
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
            <InputText
                label=''
                placeholder={'Plate license'}
                value={input}
                onChange={(e)=>{
                    setInput(e.target.value);
                }}
            />
        </Card>
    );
}


