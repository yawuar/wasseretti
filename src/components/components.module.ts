import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { CalendarComponent } from './calendar/calendar';
import { ScanComponent } from './scan/scan';
import { DeleteComponent } from './delete/delete';
import { DeleteLaundryItemComponent } from './delete-laundry-item/delete-laundry-item';
import { WashHeaderComponent } from './wash-header/wash-header';
import { CalendarHeaderComponent } from './calendar-header/calendar-header';
@NgModule({
	declarations: [CustomHeaderComponent,
    CalendarComponent,
    ScanComponent,
    DeleteComponent,
    DeleteLaundryItemComponent,
    WashHeaderComponent,
    CalendarHeaderComponent],
	imports: [],
	exports: [CustomHeaderComponent,
    CalendarComponent,
    ScanComponent,
    DeleteComponent,
    DeleteLaundryItemComponent,
    WashHeaderComponent,
    CalendarHeaderComponent]
})
export class ComponentsModule {}
