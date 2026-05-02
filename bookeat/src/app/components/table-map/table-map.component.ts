import { AfterViewInit, Component, computed, ElementRef, inject, input, OnDestroy, output, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PanzoomObject } from '@panzoom/panzoom';
import { TableMap as TableMapModel } from '../../models/restaurant.model';
import { AuthService } from '../../services/firebase/auth.service';

@Component({
  standalone: true,
  selector: 'app-table-map',
  imports: [],
  templateUrl: './table-map.component.html',
  styleUrl: './table-map.component.css',
})
export class TableMapComponent implements AfterViewInit, OnDestroy {

  private authService = inject(AuthService);
  tableMap = input.required<TableMapModel>();
  authRequired = output<void>();
  selectionChanged = output<Set<number>>();

  occupiedIds = input<number[]>([]);
  selectedIds = signal<Set<number>>(new Set());

  @ViewChild('svgEl') svgRef!: ElementRef<SVGSVGElement>;
  private panzoom: PanzoomObject | null = null;
  private wheelHandler: ((e: WheelEvent) => void) | null = null;
  private readonly platformId = inject(PLATFORM_ID);

  fontSizeUnits = computed(() => {
    const outline = this.tableMap().outline;
    if (!outline.length) return 0.5;
    const xs = outline.map(p => p.x);
    const viewBoxWidth = Math.max(...xs) - Math.min(...xs);
    return viewBoxWidth / 28;
  });

  viewBox = computed(() => {
    const outline = this.tableMap().outline;
    if (!outline.length) return '0 0 10 10';
    const xCoords = outline.map(p => p.x);
    const yCoords = outline.map(p => p.y);
    const minX = Math.min(...xCoords), minY = Math.min(...yCoords);
    return `${minX} ${minY} ${Math.max(...xCoords) - minX} ${Math.max(...yCoords) - minY}`;
  });

  outlinePoints = computed(() =>
    this.tableMap().outline.map(p => `${p.x},${p.y}`).join(' ')
  );

  tableProps = computed(() =>
    this.tableMap().tables.map(t => ({
      ...t,
      cx: (t.p1.x + t.p2.x) / 2,
      cy: (t.p1.y + t.p2.y) / 2,
      w: t.p2.x - t.p1.x,
      h: t.p2.y - t.p1.y,
    }))
  );

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const { default: Panzoom } = await import('@panzoom/panzoom');
    this.panzoom = Panzoom(this.svgRef.nativeElement, {
      maxScale: 5,
      minScale: 0.5,
      startScale: 1,
      step: 0.3,
    });
    this.wheelHandler = this.panzoom.zoomWithWheel;
    this.svgRef.nativeElement.parentElement?.addEventListener('wheel', this.wheelHandler);
  }

  ngOnDestroy() {
    if (this.wheelHandler)
      this.svgRef?.nativeElement.parentElement?.removeEventListener('wheel', this.wheelHandler);
    this.panzoom?.destroy();
  }

  isOccupied(id: number) { return this.occupiedIds().includes(id); }
  isSelected(id: number) { return this.selectedIds().has(id); }

  toggleTable(id: number) {
    if (this.isOccupied(id)) return;
    if (!this.authService.isAuthenticated()) {
      this.authRequired.emit();
      return;
    }
    this.selectedIds.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    this.selectionChanged.emit(this.selectedIds());
  }

  zoomIn() { this.panzoom?.zoomIn(); }
  zoomOut() { this.panzoom?.zoomOut(); }
  resetView() { this.panzoom?.reset(); }
}
