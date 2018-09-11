import * as React from 'react';
import * as styles from './KeyValuePairs.scss';

interface IUrlValue {
    value: string;
    url?: string;
}

type IValue = string | IUrlValue;
interface IKeyValue {
    key: string;
    value: IValue | IValue[];
}

interface IKeyValuePairsProps {
    keyValues: IKeyValue[];
}

export default class KeyValuePairs extends React.PureComponent<IKeyValuePairsProps> {
    render() {
        const { keyValues } = this.props;
        return (
            <div className={styles.root}>
                {keyValues.map((keyValuePair, index) =>
                    this.renderKeyValuePair(keyValuePair.key, keyValuePair.value, index))}
            </div>
        );
    }

    renderKeyValuePair(key: string, value: IValue | IValue[], index: number) {
        let vItemProp;
        let vItemType;

        switch (key.toLowerCase()) {
            case 'width':
                vItemProp = 'width';
                vItemType = 'http://schema.org/QuantitativeValue';
                break;
            case 'height':
                vItemProp = 'height';
                vItemType = 'http://schema.org/QuantitativeValue';
                break;
            case 'depth':
                vItemProp = 'depth';
                vItemType = 'http://schema.org/QuantitativeValue';
                break;
            case 'weight':
                vItemProp = 'weight';
                vItemType = 'http://schema.org/QuantitativeValue';
                break;
            case 'color':
                vItemProp = 'color';
                vItemType = 'http://schema.org/Text';
                break;
            default:
                vItemProp = 'additionalProperty';
                vItemType = 'http://schema.org/PropertyValue';
        }

        return (
            <dl
                itemProp={vItemProp}
                itemScope={true}
                itemType={vItemType}
                key={index}>
                <dt itemProp='name'>{key}</dt>
                <dd itemProp='value'>{this.renderValueNode(value)}</dd>
            </dl>
        );
    }

    renderValueNode(value: IValue | IValue[], key?: string | number): any {
        key = key ? key : `key${Math.random().toString()}`;

        switch (value.constructor) {
            case String:
                return <div key={key}>{value}</div>;
            case Array:
                return (value as IValue[]).map((v, i) => this.renderValueNode(v, i));
            case Object:
                if (this.isValueUrl(value))
                    return (
                        <a href={value.url} key={key}>
                            {value.value}
                        </a>
                    );
                else
                    return this.renderValueNode((value as any).value);
            default: return null;
        }
    }

    isValueUrl(value: IValue | IValue[]): value is IUrlValue {
        return (value as any).url != null;
    }
}
