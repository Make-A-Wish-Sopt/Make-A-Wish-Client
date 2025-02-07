import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

const StepFlowChart: React.FC<{
  chart: string;
  onMoveStep: (targetIdx: number, subMenuIdx?: string) => void;
}> = ({ chart, onMoveStep }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const setupMermaidClickEvents = () => {
    document.querySelectorAll('.node').forEach((el) => {
      // ✅ 포인터 커서 적용
      (el as HTMLElement).style.cursor = 'pointer';

      el.addEventListener('click', (event) => {
        const clickedNode = event.currentTarget as HTMLElement;
        const nodeIds = clickedNode.getAttribute('id').split('-');
        const [step, stepIdx, subMenuIdx] = nodeIds.slice(1, nodeIds.length - 1);

        if (step === 'If') return;
        onMoveStep(+stepIdx, subMenuIdx);
      });
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;

    mermaid.initialize({
      startOnLoad: false,
      flowchart: { useMaxWidth: true, htmlLabels: true },
    });

    mermaid
      .render('mermaidChart', chart)
      .then(({ svg }) => {
        if (chartRef.current) {
          chartRef.current.innerHTML = svg;
          setupMermaidClickEvents(); // ✅ 클릭 이벤트 등록
        }
      })
      .catch(console.error);
  }, [chart]);

  return <div ref={chartRef} className="mermaid w-full bg-white"></div>;
};

export default StepFlowChart;
