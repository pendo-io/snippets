import { IInputs, IOutputs }
    from
    "./generated/ManifestTypes";

import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

type DataSet = ComponentFramework.PropertyTypes.DataSet;

import
    "./pendoScript.js"  // This is a simple file you'll create to contain the Pendo single-page app script
                        // This script may be found in the Pendo UI at Sub settings -> Appplication Details -> Install settings

declare
var pendo: any;

export
    class <YOUR-PCF - COMPONENT - NAME >
        implements ComponentFramework.StandardControl < IInputs, IOutputs > {
            private _divContainer: HTMLDivElement;

            // Initialize variables to hold metadata values for use in the Pendo snippet initialization
            // Rename these as desired
            private _visitorValue1: any = "";
            private _visitorValue2: any = "";
            private _visitorValue3: any = "";

            private _accountValue1: any = "";
            private _accountValue1: any = "";

            private _context: ComponentFramework.Context<IInputs>;

            // Optionally, declare callpendo as a lever to enable/disable Pendo initialization
            // This could be set true or false elsewhere as an easy control
            private _callpendo: any = "";
            constructor() {
            }


   public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: ()
                => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
                this._context = context;
            }

   public updateView(context: ComponentFramework.Context<IInputs>): void {

                // Set metadata values, replacing "value" in variable name and value with desired fields from context
                this._visitorValue1 = context.parameters.visitorValue1.raw;
                this._visitorValue2 = context.parameters.visitorValue2.raw;
                this._visitorValue3 = context.parameters.visitorValue3.raw;

                this._accountValue1 = context.parameters.accountValue1.raw;
                this._accountValue2 = context.parameters.accountValue2.raw;

                // If using the optional callpendo check, check its value
                this._callpendo = context.parameters.callpendo.raw;

                // Optionally, validate that the values aren't empty
                // If values will occasionally be empty intentionally, this should be less strict or it will fail to initalize some visitors.
                // If call Pendo is true, continue to initalize
                const fieldsHaveValues = [this._visitorValue1,
                this._visitorValue2,
                this._visitorValue3,
                this._accountValue1,
                this._accountValue2].
                every(element => element !== null && element !== "");

                // If all fields above had values, and callpendo is true, proceed.

                if (fieldsHaveValues && this._callpendo === "true") {

                    // This is the actual Pendo initialization logic, which could be used without the validation logic above if preferred.
                    pendo.initialize({
                        visitor: {
                            visitorField1: this._visitorValue1,
                            visitorField2: this._visitorValue2,
                            visitorField3: this._visitorValue3
                        },
                        account: {
                            accountField1: this._accountValue1,
                            accountField2: this._accountValue2
                        }
                    });
                }
            }

   public getOutputs(): IOutputs {
                return {};
            }

   public destroy(): void {
                // Add code to cleanup control if necessary
            }
        }
