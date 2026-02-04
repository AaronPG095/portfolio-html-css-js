'use client';

import React from 'react';
import styles from './About.module.css';

interface TimelineNode {
  id: string;
  yearLabel?: string;
  title: string;
  description?: string;
  isFuture?: boolean;
  isTransition?: boolean;
  connectsToBranch?: string;
  isCurrentPosition?: boolean;
  position?: number;
}

interface TimelineBranch {
  id: string;
  label: string;
  nodes: TimelineNode[];
  isPast?: boolean;
}

interface TimelineSVGProps {
  branches: TimelineBranch[];
}

/**
 * Maps node title to remove "N1:", "N2:", etc. prefixes
 */
function cleanNodeTitle(title: string): string {
  return title.replace(/^N\d+:\s*/, '');
}

/**
 * Splits branch label into two lines for better display
 */
function splitBranchLabel(label: string): [string, string] {
  const words = label.split(' ');
  if (words.length === 1) {
    return [words[0], ''];
  }
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/**
 * Maps branch ID to color
 */
function getBranchColor(branchId: string): string {
  const colors: { [key: string]: string } = {
    'chef-work': '#e74c3c',
    'software-education': '#3498db',
    'software-experience': '#2ecc71',
  };
  return colors[branchId] || '#95a5a6';
}

/**
 * Maps branch to Y coordinate
 */
function getBranchY(branchId: string, branchIndex: number): number {
  const yPositions: { [key: string]: number } = {
    'chef-work': 100,
    'software-education': 220,
    'software-experience': 340,
  };
  return yPositions[branchId] || 100 + branchIndex * 120;
}

/**
 * Maps node to X coordinate based on node ID and position
 */
function getNodeX(nodeId: string, position: number, branchId: string, leftPadding: number = 0): number {
  // Fixed coordinate mapping based on the provided code
  const fixedPositions: { [key: string]: number } = {
    'restaurant-zest': 80,
    'bootcamp-start': 250,
    'dci-bootcamp': 250,
    'graduation': 500,
    'online-courses': 650,
    'internship': 500,
    'personal-projects': 650,
    'current-position': 900, // Will be replaced by Computer Science Degree
  };
  
  if (fixedPositions[nodeId]) {
    return fixedPositions[nodeId] + leftPadding;
  }
  
  // Fallback: map percentage to coordinate (0-100% maps to 80-1120)
  return 80 + leftPadding + (position / 100) * (1120 - 80);
}

/**
 * Gets branch start X coordinate
 */
function getBranchStartX(branchId: string): number {
  const startPositions: { [key: string]: number } = {
    'chef-work': 80,
    'software-education': 250,
    'software-experience': 500,
  };
  return startPositions[branchId] || 80;
}

/**
 * Gets branch transition X coordinate (where it becomes dashed)
 */
function getBranchTransitionX(branchId: string): number {
  // All branches transition at x=900 based on the provided code
  return 900;
}

export default function TimelineSVG({ branches }: TimelineSVGProps) {
  // Reduced left padding by 50%: from 200px to 100px, keep right reduction: 1200 + 100 - 100 = 1200
  const leftPadding = 100;
  const rightReduction = 100;
  const svgWidth = 1200 + leftPadding - rightReduction; // 1200
  const viewBox = `0 0 ${svgWidth} 450`;
  
  return (
    <div className={styles.timelineSVGWrapper}>
      <svg 
        viewBox={viewBox} 
        className={styles.timelineSVG}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Career timeline"
      >
        {/* Background */}
        <rect width={svgWidth} height="450" fill="#f8f9fa" className={styles.timelineBackground} />
        
        {/* Timeline markers */}
        <text x={60 + leftPadding} y="30" fontSize="11" fill="#7f8c8d" fontStyle="italic" className={styles.timelineMarker}>
          2023
        </text>
        <text x={svgWidth - 120} y="30" fontSize="11" fill="#7f8c8d" fontStyle="italic" className={styles.timelineMarker}>
          Future →
        </text>
        
        {/* Branch Labels */}
        {branches.map((branch, branchIndex) => {
          const [line1, line2] = splitBranchLabel(branch.label);
          const y = getBranchY(branch.id, branchIndex);
          const color = getBranchColor(branch.id);
          // Shift labels to the right by leftPadding, ensure Professional Chef has enough space
          // B2 label adjusted to match 60px spacing: node at 350, so label at 290 (190 + 100)
          // B3 label adjusted to match 60px spacing: node at 600, so label at 540 (440 + 100)
          const labelX = branchIndex === 0 ? 20 + leftPadding : branchIndex === 1 ? 190 + leftPadding : 440 + leftPadding;
          
          return (
            <g key={`label-${branch.id}`}>
              <text 
                x={labelX} 
                y={y - 5} 
                fontSize="15" 
                fontWeight="600" 
                fill={color} 
                textAnchor="end"
                className={styles.branchLabelText}
              >
                {line1}
              </text>
              {line2 && (
                <text 
                  x={labelX} 
                  y={y + 12} 
                  fontSize="15" 
                  fontWeight="600" 
                  fill={color} 
                  textAnchor="end"
                  className={styles.branchLabelText}
                >
                  {line2}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Branch Lines */}
        {branches.map((branch) => {
          const y = getBranchY(branch.id, 0);
          const color = getBranchColor(branch.id);
          const startX = getBranchStartX(branch.id) + leftPadding;
          const transitionX = getBranchTransitionX(branch.id) + leftPadding;
          // Reduce end position by rightReduction: 1120 + leftPadding - rightReduction
          const endX = 1120 + leftPadding - rightReduction;
          
          return (
            <g key={`line-${branch.id}`}>
              {/* Solid line */}
              <line 
                x1={startX} 
                y1={y} 
                x2={transitionX} 
                y2={y} 
                stroke={color} 
                strokeWidth="3" 
                strokeLinecap="round"
                className={styles.branchLineSolid}
              />
              {/* Dashed line */}
              <line 
                x1={transitionX} 
                y1={y} 
                x2={endX} 
                y2={y} 
                stroke={color} 
                strokeWidth="3" 
                strokeDasharray="8,4" 
                opacity={branch.id === 'chef-work' ? 0.3 : 0.4} 
                strokeLinecap="round"
                className={styles.branchLineDashed}
              />
            </g>
          );
        })}
        
        {/* Connector Lines */}
        <line 
          x1={250 + leftPadding} 
          y1="100" 
          x2={250 + leftPadding} 
          y2="220" 
          stroke="#95a5a6" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.6"
          className={styles.connectorLine}
        />
        <line 
          x1={500 + leftPadding} 
          y1="220" 
          x2={500 + leftPadding} 
          y2="340" 
          stroke="#95a5a6" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.6"
          className={styles.connectorLine}
        />
        
        {/* Nodes */}
        {branches.map((branch) => {
          const y = getBranchY(branch.id, 0);
          const color = getBranchColor(branch.id);
          
          return branch.nodes.map((node) => {
            // Skip current-position node as it's replaced by Computer Science Degree
            if (node.id === 'current-position') {
              return null;
            }
            
            const x = getNodeX(node.id, node.position || 0, branch.id, leftPadding);
            const isTransition = node.isTransition || false;
            const cleanTitle = cleanNodeTitle(node.title);
            
            // Split title based on specific node requirements
            let titleLines: string[] = [cleanTitle];
            
            // Map specific node titles to match provided design
            if (node.id === 'dci-bootcamp') {
              titleLines = ['12-Month DCI', 'Bootcamp'];
            } else if (node.id === 'online-courses') {
              titleLines = ['Online', 'Courses'];
            } else if (node.id === 'internship') {
              // Use "2-Month Developer Internship" to match provided code
              titleLines = ['2-Month Developer', 'Internship'];
            } else if (node.id === 'personal-projects') {
              titleLines = ['Personal', 'Projects'];
            } else if (cleanTitle.length > 15 && !cleanTitle.includes('\n')) {
              // Generic split for long titles
              const spaceIndex = cleanTitle.lastIndexOf(' ', 15);
              if (spaceIndex > 0) {
                titleLines = [cleanTitle.substring(0, spaceIndex), cleanTitle.substring(spaceIndex + 1)];
              }
            }
            
            return (
              <g key={node.id}>
                {/* Node circle */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isTransition ? 11 : 9} 
                  fill={isTransition ? '#95a5a6' : color} 
                  stroke="white" 
                  strokeWidth={isTransition ? 3 : 2}
                  className={styles.nodeCircle}
                />
                {isTransition && (
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="16" 
                    fill="none" 
                    stroke="#95a5a6" 
                    strokeWidth="2" 
                    opacity="0.3"
                    className={styles.nodeCircleOuter}
                  />
                )}
                
                {/* Node title */}
                {titleLines.map((line, index) => {
                  const isSingleLine = titleLines.length === 1;
                  const baseOffset = isSingleLine ? 30 : 40;
                  return (
                    <text 
                      key={`title-${index}`}
                      x={x} 
                      y={y - baseOffset + (index * 15)} 
                      textAnchor="middle" 
                      fontSize="12" 
                      fill="#34495e" 
                      fontWeight="600"
                      className={styles.nodeTitle}
                    >
                      {line}
                    </text>
                  );
                })}
                
                {/* Node description */}
                {node.description && (
                  <text 
                    x={x} 
                    y={y + 40} 
                    textAnchor="middle" 
                    fontSize="10" 
                    fill="#7f8c8d" 
                    fontStyle="italic"
                    className={styles.nodeDescription}
                  >
                    {node.description}
                  </text>
                )}
              </g>
            );
          });
        })}
        
        {/* Future Node: Computer Science Degree */}
        <g>
          <circle 
            cx={900 + leftPadding} 
            cy="220" 
            r="9" 
            fill="#3498db" 
            stroke="white" 
            strokeWidth="2"
            className={styles.nodeCircle}
          />
          <text 
            x={900 + leftPadding} 
            y="180" 
            textAnchor="middle" 
            fontSize="12" 
            fill="#34495e" 
            fontWeight="600"
            className={styles.nodeTitle}
          >
            Computer Science
          </text>
          <text 
            x={900 + leftPadding} 
            y="195" 
            textAnchor="middle" 
            fontSize="12" 
            fill="#34495e" 
            fontWeight="600"
            className={styles.nodeTitle}
          >
            Degree
          </text>
          <text 
            x={900 + leftPadding} 
            y="260" 
            textAnchor="middle" 
            fontSize="10" 
            fill="#7f8c8d" 
            fontStyle="italic"
            className={styles.nodeDescription}
          >
            (Future Goal)
          </text>
        </g>
        
        {/* Future indicators */}
        <g opacity="0.4" className={styles.futureIndicators}>
          <circle cx={900 + leftPadding} cy="100" r="5" fill="#e74c3c" />
          <circle cx={900 + leftPadding} cy="340" r="5" fill="#2ecc71" />
        </g>
      </svg>
    </div>
  );
}
