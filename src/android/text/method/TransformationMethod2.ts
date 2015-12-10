/*
 * Copyright (C) 2011 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

///<reference path="../../../android/text/method/TransformationMethod.ts"/>

module android.text.method {
    import TransformationMethod = android.text.method.TransformationMethod;
    /**
     * TransformationMethod2 extends the TransformationMethod interface
     * and adds the ability to relax restrictions of TransformationMethod.
     *
     * @hide
     */
    export interface TransformationMethod2 extends TransformationMethod {

        /**
         * Relax the contract of TransformationMethod to allow length changes,
         * or revert to the length-restricted behavior.
         *
         * @param allowLengthChanges true to allow the transformation to change the length
         *                           of the input string.
         */
        setLengthChangesAllowed(allowLengthChanges:boolean):void ;
    }
    export module TransformationMethod2 {
        export function isImpl(obj):boolean {
            return TransformationMethod.isImpl(obj) && obj['setLengthChangesAllowed'];
        }
    }
}