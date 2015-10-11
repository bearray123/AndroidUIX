/**
 * Created by linfaxin on 15/10/5.
 */
///<reference path="Message.ts"/>
///<reference path="MessageQueue.ts"/>
///<reference path="../../java/lang/Runnable.ts"/>
///<reference path="SystemClock.ts"/>

module android.os {
    import Runnable = java.lang.Runnable;

    export class Handler {
        mCallback:Handler.Callback;
        mQueue:MessageQueue = new MessageQueue();

        constructor(mCallback?:Handler.Callback) {
            this.mCallback = mCallback;
        }

        handleMessage(msg:Message) {
        }

        dispatchMessage(msg:Message) {
            if (msg.callback != null) {
                msg.callback.run.call(msg.callback);
            } else {
                if (this.mCallback != null) {
                    if (this.mCallback.handleMessage(msg)) {
                        return;
                    }
                }
                this.handleMessage(msg);
            }
        }

        obtainMessage():Message;
        obtainMessage(what:number):Message;
        obtainMessage(what:number, obj:any):Message;
        obtainMessage(what:number, arg1:number, arg2:number):Message;
        obtainMessage(what:number, arg1:number, arg2:number, obj:any):Message;
        obtainMessage(...args):Message {
            if (args.length === 2) {
                let [what, obj] = args;
                return Message.obtain(this, what, obj);
            } else {
                let [what, arg1, arg2, obj] = args;
                return Message.obtain(this, what, arg1, arg2, obj);
            }
        }

        post(r:Runnable):boolean {
            return this.sendMessageDelayed(Handler.getPostMessage(r), 0);
        }

        postAtTime(r:Runnable, uptimeMillis:number):boolean;
        postAtTime(r:Runnable, token:any, uptimeMillis:number):boolean;
        postAtTime(...args):boolean {
            if (args.length === 2) {
                let [r, uptimeMillis] = args;
                return this.sendMessageAtTime(Handler.getPostMessage(r), uptimeMillis);
            } else {
                let [r, token, uptimeMillis] = args;
                return this.sendMessageAtTime(Handler.getPostMessage(r, token), uptimeMillis);
            }
        }

        postDelayed(r:Runnable, delayMillis:number):boolean {
            return this.sendMessageDelayed(Handler.getPostMessage(r), delayMillis);
        }

        postAtFrontOfQueue(r:Runnable):boolean {
            return this.post(r);
        }

        removeCallbacks(r:Runnable, token?:any) {
            this.mQueue.removeMessages(this, r, token);
        }

        sendMessage(msg:Message):boolean {
            return this.sendMessageDelayed(msg, 0);
        }

        sendEmptyMessage(what:number):boolean {
            return this.sendEmptyMessageDelayed(what, 0);
        }

        sendEmptyMessageDelayed(what:number, delayMillis:number):boolean {
            let msg = Message.obtain();
            msg.what = what;
            return this.sendMessageDelayed(msg, delayMillis);
        }

        sendEmptyMessageAtTime(what:number, uptimeMillis:number):boolean {
            let msg = Message.obtain();
            msg.what = what;
            return this.sendMessageAtTime(msg, uptimeMillis);
        }

        sendMessageDelayed(msg:Message, delayMillis:number):boolean {
            if (delayMillis < 0) {
                delayMillis = 0;
            }
            msg.target = this;

            //send delay
            let id = setTimeout(()=> {
                this.dispatchMessage(msg);
                this.mQueue.recycleMessage(this, msg);

            }, delayMillis);
            this.mQueue.addMessage(this, msg, id);
            return true;
        }

        sendMessageAtTime(msg:Message, uptimeMillis:number) {
            return this.sendMessageDelayed(msg, uptimeMillis - SystemClock.uptimeMillis());
        }

        sendMessageAtFrontOfQueue(msg:Message) {
            return this.sendMessage(msg);
        }

        removeMessages(what:number, object?:any) {
            this.mQueue.removeMessages(this, what, object);
        }

        removeCallbacksAndMessages(token?:any) {
            this.mQueue.removeCallbacksAndMessages(this, token);
        }

        hasMessages(what:number, object?:any):boolean {
            return this.mQueue.hasMessages(this, what, object);
        }

        private static getPostMessage(r:Runnable, token?:any):Message {
            let m = Message.obtain();
            m.obj = token;
            m.callback = r;
            return m;
        }
    }

    export module Handler {
        export interface Callback {
            handleMessage(msg:Message):boolean;
        }

    }
}