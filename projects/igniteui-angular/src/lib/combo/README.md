# igx-combo
The igx-combo component provides a powerful input, combining the features of the basic HTML input, select and the IgniteUI for Angular igx-drop-down components.
The combo component provides easy filtering and selection of multiple items, grouping and adding custom values to the dropdown list.
Custom templates could be provided in order to customize different areas of the components, such as items, header, footer, etc.
The combo component is integrated with the Template Driven and Reactive Forms.
The igx-combo exposes intuitive keyboard navigation and it is accessibility compliant.
Drop Down items are virtualized, which guarantees smooth work, even if the igx-combo is bound to data source with a lot of items.


`igx-combo` is a component.  
A walkthrough of how to get started can be found [here](https://www.infragistics.com/products/ignite-ui-angular/angular/components/combo.html)

# Usage
Basic usage of `igx-combo` bound to a local data source, defining `valueKey` and `displayKey`:

```html
<igx-combo [data]="localData" [valueKey]="'ProductID'" [displayKey]="'ProductName'"></igx-combo>
```

Remote binding, defining `valueKey` and `displayKey`, and exposing `onDataPreLoad` that allows to load new chunk of remote data to the combo (see the sample above as a reference):

```html
<igx-combo [data]="remoteData | async" (onDataPreLoad)="dataLoading($event)" [valueKey]="'ProductID'" [displayKey]="'ProductName'" ></igx-combo>
```

```typescript
public ngOnInit() {
    this.remoteData = this.remoteService.remoteData;
}

public ngAfterViewInit() {
    this.remoteService.getData(this.combo.virtualizationState, (data) => {
        this.combo.totalItemCount = data.length;
    });
}

public dataLoading(evt) {
        if (this.prevRequest) {
            this.prevRequest.unsubscribe();
        }

        this.prevRequest = this.remoteService.getData(this.combo.virtualizationState, () => {
            this.cdr.detectChanges();
            this.combo.triggerCheck();
        });
    }
```

> Note: In order to have combo with remote data, what you need is to have a service that retrieves data chunks from a server. 
What the combo exposes is a `virtualizationState` property that gives state of the combo - first index and the number of items that needs to be loaded.
The service, should inform the combo for the total items that are on the server - using the `totalItemCount` property.


## Features

### Value Binding

If we want to use a two-way data-binding, we could just use `ngModel` like this:

```html
<igx-combo #combo [(ngModel)]="values"></igx-combo>
```

```typescript
@ViewChild('combo', { read: IgxComboComponent }) public combo: IgxComboComponent;
get values() {
    return this.combo.selectedItems();
}
set values(newValues: Array<any>) {
    this.combo.selectItems(newValues);
}
```

<div class="divider--half"></div>

### Filtering
By default filtering in the combo is enabled. However you can disable it using the following code:

```html
<igx-combo [filterable]="false"></igx-combo>
```

<div class="divider--half"></div>

<div class="divider--half"></div>

### Custom Values
Enabling the custom values will add missing from the list, using the combo's interface.

```html
<igx-combo [allowCustomValues]="true"></igx-combo>
```

<div class="divider--half"></div>

### Disabled
You can disable combo using the following code:

```html
<igx-combo [disabled]="true"></igx-combo>
```

<div class="divider--half"></div>

### Grouping
Defining a combo's groupKey option will group the items, according to that key.

```html
<igx-combo [groupKey]="'primaryKey'"></igx-combo>
```

<div class="divider--half"></div>

### Templates
Templates for different parts of the control can be defined, including items, header and footer, etc.
When defining one of the them, you need to reference list of predefined names, as follows:

#### Defining item template:
```html
<igx-combo>
	<ng-template #itemTemplate let-display let-key="valueKey">
		<div class="item">
			<span class="state">State: {{ display[key] }}</span>
			<span class="region">Region: {{ display.region }}</span>
		</div>
	</ng-template>
</igx-combo>
```

#### Defining header template:

```html
<igx-combo>
    <ng-template #headerTemplate>
        <div class="header-class">Custom header</div>
        <img src=""/>
    </ng-template>
</igx-combo>
```

#### Defining footer template:

```html
<igx-combo>
    <ng-template #footerTemplate>
        <div class="footer-class">Custom footer</div>
        <img src=""/>
    </ng-template>
</igx-combo>
```

#### Defining empty template:

```html
<igx-combo>
    <ng-template #emptyTemplate>
        <span>List is empty</div>
    </ng-template>
</igx-combo>
```

#### Defining add template:

```html
<igx-combo>
    <ng-template #addItemTemplate>
        <span>Add town</span>
    </ng-template>
</igx-combo>
```
<div class="divider--half"></div>

## Keyboard Navigation

When igxCombo is closed and focused:
- `ArrowDown` or `Alt` + `ArrowDown` will open the combo drop down and will move focus to the search input.

When igxCombo is opened and search input is focused:
- `ArrowUp` or `Alt` + `ArrowUp` will close the combo drop down and will move focus to the closed combo.
- `ArrowDown` will move focus from the search input to the first list item.If list is empty and custom values are enabled will move it to the Add new item button.
  > Note: Any other key stroke will be handled by the input.

When igxCombo is opened and list item is focused:
- `ArrowDown` will move to next list item. If the active item is the last one in hte list and custom values are enabled then focus will be moved to the Add item button.

- `ArrowUp` will move to previous list item. If the active item is the first one in the list then focus will be moved back to the search input.

- `End` will move to last list item.

- `Home` will move to first list item.

- `Space` will select/deselect active list item.

- `Enter` will confirm the already selected items and will close the list.

- `Esc` will close the list.

When igxCombo is opened, allow custom values are enabled and add item button is focused:

- `Enter` will add new item with valueKey and displayKey equal to the text in the search input and will select the new item.

- `ArrowUp` focus will be moved back to the last list item or if list is empty will be moved to the search input.


## API

### Inputs

| Name                     | Description                                       | Type                        |
|--------------------------|---------------------------------------------------|-----------------------------|
|  `id`                    | combo id                                          | string                      |
|  `data`                  | combo data source                                 | any                         |
|  `allowCustomValue`      | enables/disables combo custom value                | boolean                     |
|  `filterable`            | enables/disables combo drop down filtering - enabled by default                  | boolean                     |
|  `valueKey`              | combo value data source property                  | string                      |
|  `displayKey`            | combo display data source property                | string                      |
|  `groupKey`              | combo item group                                  | string                      |
|  `virtualizationState`   | defines the current state of the virtualized data. It contains `startIndex` and `chunkSize`      | `IForOfState`               |
|  `totalItemCount`        | total count of the virtual data items, when using remote service                                | number                      |
|  `width `                | defines combo width                               | string                      |
| `displayDensity` | defines the display density of the combo . Available options are `cosy`, `compact`, `comfortable` | `DisplayDensity | string` |
|  `itemsMaxHeight `       | defines drop down maximum height                  | number                      |
|  `itemsWidth `           | defines drop down width                           | string                      |
|  `itemHeight `           | defines drop down item height                     | number                      |
|  `placeholder `          | defines the "empty value" text                    | string                      |
|  `searchPlaceholder `    | defines the placeholder text for search input     | string                      |
|  `collapsed`             | gets drop down state                              | boolean                     |
|  `disabled`              | defines whether the control is active or not      | boolean                     |
|  `ariaLabelledBy`        | defines label ID related to combo                 | boolean                     |
|  `type`                  | Combo style. - "line", "box", "border", "search"                                        | string                      |
|  `valid`                 | gets if control is valid, when used in a form     | boolean                     |

### Getters
| Name                     | Description                                       | Type                        |
|--------------------------|---------------------------------------------------|-----------------------------|
|  `value`                    | the value of the combo text field                                          | string                      |

### Outputs

| Name                | Description                                                             | Cancelable   | Parameters                              |
|------------------   |-------------------------------------------------------------------------|------------- |-----------------------------------------|
| `onSelectionChange` | Emitted when item selection is changing, before the selection completes | true         | { oldSelection: `Array<any>`, newSelection: `Array<any>`, event: Event } |
| `onSearchInput`     | Emitted when an the search input's input event is triggered             | false        | { searchValue: `string` }               |
| `onAddition`        | Emitted when an item is being added to the data collection              | false        | { oldCollection: `Array<any>`, addedItem: `<any>`, newCollection: `Array<any>` }|
| `onDataPreLoad`     | Emitted when new chunk of data is loaded from the virtualization        | false        | { event: Event }                        |
| `onOpening`   | Emitted before the dropdown is opened                                   | false        | { event: Event }                        |
| `onOpened`    | Emitted after the dropdown is opened                                    | false        | { event: Event }                        |
| `onClosing`   | Emitted before the dropdown is closed                                   | false        | { event: Event }                        |
| `onClosed`    | Emitted after the dropdown is closed                                    | false        | { event: Event }                        |

### Methods

| Name             | Description                 | Return type          | Parameters                  |
|----------------- |-----------------------------|----------------------|-----------------------------|
| `open`           | Opens drop down             | `void`               | `None`                      |
| `close`          | Closes drop down            | `void`               | `None`                      |
| `toggle`         | Toggles drop down           | `void`               | `None`                      |
| `selectedItems`  | Get current selection state | `Array<any>`         | `None`                      |
| `selectItems`    | Select defined items        | `void`               | items: `Array<any>`, clearCurrentSelection: `boolean` |
| `deselectItems`  | Deselect defined items      | `void`               | items: `Array<any>`         |
| `selectAllItems` | Select all (filtered) items | `void`               | ignoreFilter?: `boolean` - if `true` selects **all** values |
| `deselectAllItems` | Deselect (filtered) all items | `void`           | ignoreFilter?: `boolean` - if `true` deselects **all** values |
| `setSelectedItem` | Toggles (select/deselect) an item by key | `void` | itemID: any, select = true, event?: Event |
