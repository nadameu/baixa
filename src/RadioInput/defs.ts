declare const IsRadio: unique symbol;

export interface RadioInput extends HTMLInputElement {
	[IsRadio]: never;
}
