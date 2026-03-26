import { Component, OnInit, AfterViewInit, inject, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as echarts from 'echarts';
import { SVGRenderer } from 'echarts/renderers';

(echarts as unknown as { use: (plugins: unknown[]) => void }).use([SVGRenderer]);

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  private api = inject(ApiService);
  
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  private lineInstance?: echarts.ECharts;
  private barInstance?: echarts.ECharts;
  private pieInstance?: echarts.ECharts;

  ngOnInit() {}

  ngAfterViewInit() {
    this.api.getChartData().subscribe(data => {
      this.initLineChart(data.line);
      this.initBarChart(data.bar);
      this.initPieChart(data.pie);
    });
  }

  private initLineChart(data: any) {
    this.lineInstance = echarts.init(this.lineChartRef.nativeElement, { renderer: 'svg' });
    this.lineInstance.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: data.series.map((s: any) => s.name) },
      xAxis: { type: 'category', data: data.categories },
      yAxis: { type: 'value' },
      series: data.series.map((s: any) => ({ name: s.name, type: 'line', data: s.data }))
    });
  }

  private initBarChart(data: any) {
    this.barInstance = echarts.init(this.barChartRef.nativeElement, { renderer: 'svg' });
    this.barInstance.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: data.series.map((s: any) => s.name) },
      xAxis: { type: 'category', data: data.categories },
      yAxis: { type: 'value' },
      series: data.series.map((s: any) => ({ name: s.name, type: 'bar', data: s.data }))
    });
  }

  private initPieChart(data: any) {
    this.pieInstance = echarts.init(this.pieChartRef.nativeElement, { renderer: 'svg' });
    this.pieInstance.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        data: data.series.map((s: any) => ({ name: s.name, value: s.value }))
      }]
    });
  }

  ngOnDestroy() {
    this.lineInstance?.dispose();
    this.barInstance?.dispose();
    this.pieInstance?.dispose();
  }
}