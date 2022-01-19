import React from 'react';
import {useEffect, useState} from 'react';
import {manager} from '../api/ws';
import Step from '../componment/StepsForm/Step';
import SimulateEnter, {handleEnterAndTracking} from '../componment/StepsForm/SimulateEnter';
import SimulateExit, {handleExit} from '../componment/StepsForm/SimulateExit';
import OrderState from '../componment/StepsForm/OrderState';
import {useWebsocket} from '../hook/useWebsocket';
import {Order, Status} from '../models/order';
import Finish from '../componment/StepsForm/Finish';

/**
 * the page that related  operation
 * @return {ReactElement}
 */
export default function SimulatePage() {
    const socket = useWebsocket(manager);
    const [step, setStep] = useState<number>(1);
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!socket) {
            setStep(1);
        }
    }, []);

    useEffect(() => {
        if (!order) {
            setStep(1);
        } else {
            switch (order?.status) {
            case Status.pending:
                setStep(2);
                break;
            case Status.enter:
                setStep(3);
                break;
            case Status.exit:
                setStep(4);
                break;
            case Status.done:
                setStep(5);
                break;
            }
        }
    }, [order]);

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className='container flex flex-col text-center items-center justify-around basis-3/4'>
            {
                step === 1 &&
                    <SimulateEnter
                        handler={handleEnterAndTracking(
                            socket!,
                            (order)=> {
                                setOrder(order);
                            }, (err)=>setError(err))}
                    />
            }
            {
                (step >= 2 && step <=3) && order !== null &&
                    <OrderState
                        order={order}
                        handler={()=>{
                            if (socket) {
                                socket.removeListener(`order:${order.id}`);
                                setOrder(null);
                                setStep(1);
                            }
                        }}
                    />
            }
            {
                step === 4 && order !== null &&
                    <SimulateExit
                        order={order}
                        handler={handleExit(
                            socket!,
                            (order)=> {
                                setOrder(order);
                                setStep(5);
                            }, (err)=>setError(err))}
                    />
            }
            {
                step === 5 &&
                    <Finish
                        handler={()=> {
                            setOrder(null);
                            setStep(1);
                        }}
                    />
            }
            <Step.List>
                <Step.Node step={1} currentStep={step} label='等待輸入' />
                <Step.Node step={2} currentStep={step} label='等待使用者確認進場' />
                <Step.Node step={3} currentStep={step} label='進場中' />
                <Step.Node step={4} currentStep={step} label='收到付款開始離場' />
                <Step.Node step={5} currentStep={step} label='訂單完成!' isLast={true}/>
            </Step.List>
        </div>
    );
}
