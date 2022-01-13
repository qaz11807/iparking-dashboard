import React, {useState} from 'react';
import {Socket} from 'socket.io-client';
import {OrderRepo, SimulateRepo} from '../../api/service';
import {Order} from '../../models/order';
import {parseObject} from '../../utils/busy';
import {Card} from '../Card';
import {InputRadio, InputText} from '../Form/FormInputs';

export type ToggleType = 'tracking' | 'simulate';

export const handleEnterAndTracking = (socket: Socket, onSuccess: (order: Order)=> void, onFailed: (err: Error)=> void)=>{
    return async (toggle: ToggleType, input: string) => {
        if (!socket) {
            return;
        }
        try {
            if (socket) {
                let id = input.trim();
                if (toggle === 'simulate') {
                    id = await SimulateRepo.enter(input.trim());
                }
                const order = await OrderRepo.get(parseInt(id));
                socket.on(`order:${order.id}`, (data) => {
                    const order = parseObject(data);
                    onSuccess(order as unknown as Order);
                });
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
    handler: (toggle: ToggleType, input: string)=>void;
}
/**
 * the page that related  operation
 * @return {ReactElement}
 */
export default function SimulateEnter({handler}: StepProps) {
    const [toggle, setToggle] = useState<ToggleType>('simulate');
    const [input, setInput] = useState<string>('');

    return (
        <Card
            title={toggle.toUpperCase()}
            actionLabel='Next'
            onAction={()=>{
                handler(toggle, input);
            }}
        >
            <div className='flex'>
                <InputRadio
                    label='Tracking'
                    value='tracking'
                    checked={toggle === 'tracking'}
                    onChange={(e)=>{
                        if (e.target.checked) {
                            setToggle('tracking');
                        }
                    }}
                />
                <InputRadio
                    label='Simulate'
                    value='tracking'
                    checked={toggle === 'simulate'}
                    onChange={(e)=>{
                        if (e.target.checked) {
                            setToggle('simulate');
                        }
                    }}
                />
            </div>
            <InputText
                label=''
                placeholder={toggle === 'simulate' ? 'Plate license' : 'Order id'}
                value={input}
                onChange={(e)=>{
                    setInput(e.target.value);
                }}
            />
        </Card>
    );
}


