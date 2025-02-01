'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import useFormSteps from '@/hooks/common/useLinkedList';
import Button from '@/components/Common/Button';

export default function StepVisual({ test }: { test: any }) {
  const stepArray = ['link', 'select', { deepStep1: ['account', 'kakaopay'] }, 'done'];
  const { currentStep, onNextStep, onPrevStep, onNextSteps } = test;

  const [isOpen, setIsOpen] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      drawTree();
    }
  }, [isOpen, currentStep()]);

  function drawTree() {
    if (!svgRef.current) return;

    const width = window.innerWidth, // 화면 너비에 맞게 조정
      height = window.innerHeight; // 화면 높이에 맞게 조정
    const svg = d3
      .select(svgRef.current)
      .attr('width', 331)
      .attr('height', 800)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll('*').remove(); // 초기화

    const len = 0;

    const hierarchyData = d3.hierarchy(parseStepArray(stepArray));
    const treeLayout = d3.tree().size([height - 50, width - 20]); // 높이와 너비를 바꿔서 계층 구조를 명확히 함
    treeLayout(hierarchyData);

    svg
      .append('g')
      .selectAll('.link')
      .data(hierarchyData.links())
      .join('path') // 선을 path로 변경하여 화살표를 추가
      .attr('class', 'link')
      .attr(
        'd',
        (d) => `M${d.source.x + len},${d.source.y + len} L${d.target.x + len},${d.target.y + len}`, // C를 L로 변경하여 직선으로 변경
      )
      .attr('stroke', '#666')
      .attr('fill', 'none');

    const nodeGroup = svg
      .append('g')
      .selectAll('.node')
      .data(hierarchyData.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    nodeGroup
      .append('circle') // 문자열 노드에 대한 동그란 모양
      .filter((d) => typeof d.data.name === 'string')
      .attr('r', 80)
      .attr('fill', (d) => (d.data.name === currentStep() ? '#ff6347' : '#4682b4'));

    // nodeGroup
    //   .append('rect') // 객체 노드에 대한 네모난 모양
    //   .filter((d) => typeof d.data.name === 'object')
    //   .attr('width', 100) // 너비 조정
    //   .attr('height', 40) // 높이 조정
    //   .attr('fill', (d) => (d.data.name === currentStep() ? '#ff6347' : '#4682b4'));

    nodeGroup
      .append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '50px')
      .attr('fill', (d) => (d.data.name === currentStep() ? '#fff' : '#000'))
      .text(
        (d) =>
          // typeof d.data.name === 'string' ? d.data.name : Object.values(d.data)[0].join(', '),
          d.data.name,
      ); // 객체의 value를 나열
  }

  function parseStepArray(steps) {
    return {
      name: steps[0], // 최상단 루트를 steps의 첫 번째 요소로 설정
      children: [{ name: steps[1] }, { name: steps[2] }],
    };
  }

  const createChildren = (step) => {
    // console.log('step is : ', step, 'depth is :', depth);
    if (typeof step === 'string') {
      const test = { name: step }; // 깊이를 추가

      return test;
    }

    const key = Object.keys(step)[0];
    const test = {
      name: key,
      children: step[key].map((s) => createChildren(s)), // 깊이를 증가시켜 재귀 호출
    };

    return test;
  };

  return (
    <div className="h-1500">
      <Button onClick={() => setIsOpen(true)}>트리 시각화 열기</Button>

      {isOpen && (
        <div className="modal-overlay absolute" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <svg className="fixed" ref={svgRef}></svg>
          </div>
        </div>
      )}

      <div className="flex gap-5">
        <Button onClick={onPrevStep}>이전 단계</Button>
        <Button onClick={onNextStep}>다음 단계</Button>
      </div>
    </div>
  );
}
