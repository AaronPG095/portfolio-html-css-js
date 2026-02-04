'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
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
  const { t } = useLanguage();
  
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
        aria-label={t('about.timeline.heading')}
      >
        {/* Background */}
        <rect width={svgWidth} height="450" fill="#f8f9fa" className={styles.timelineBackground} rx="12" ry="12" />
        
        {/* Timeline markers */}
        <text x={60 + leftPadding} y="50" fontSize="13" fontStyle="italic" className={styles.timelineMarker}>
          {t('about.timeline.markers.startYear')}
        </text>
        <text x={svgWidth - 120} y="50" fontSize="13" fontStyle="italic" className={styles.timelineMarker}>
          {t('about.timeline.markers.future')}
        </text>
        
        {/* Top timeline line */}
        <line 
          x1={110 + leftPadding} 
          y1="50" 
          x2={svgWidth - 130} 
          y2="50" 
          stroke="#95a5a6" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.6"
          strokeLinecap="round"
          className={styles.timelineTopLine}
        />
        
        {/* Year 2026 Node */}
        <g 
          className={styles.nodeGroup}
          pointerEvents="all"
          style={{ transformOrigin: `${750 + leftPadding}px 50px` }}
        >
          <circle 
            cx={750 + leftPadding} 
            cy="50" 
            r="9" 
            fill="#95a5a6" 
            stroke="white" 
            strokeWidth="2"
            className={styles.nodeCircle}
          />
          <text 
            x={750 + leftPadding} 
            y="40" 
            textAnchor="middle" 
            fontSize="13" 
            fill="var(--color-dark-grey)" 
            fontWeight="500"
            fontStyle="italic"
            className={styles.timelineMarker}
          >
            {t('about.timeline.markers.year2026')}
          </text>
        </g>
        
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
            
            // Split title based on specific node requirements using translations
            let titleLines: string[] = [cleanTitle];
            
            // Map specific node titles to match provided design using translations
            if (node.id === 'dci-bootcamp') {
              titleLines = [t('about.timeline.nodes.dciBootcampLine1'), t('about.timeline.nodes.dciBootcampLine2')];
            } else if (node.id === 'online-courses') {
              titleLines = [t('about.timeline.nodes.onlineCoursesLine1'), t('about.timeline.nodes.onlineCoursesLine2')];
            } else if (node.id === 'internship') {
              titleLines = [t('about.timeline.nodes.internshipLine1'), t('about.timeline.nodes.internshipLine2')];
            } else if (node.id === 'personal-projects') {
              titleLines = [t('about.timeline.nodes.personalProjectsLine1'), t('about.timeline.nodes.personalProjectsLine2')];
            } else if (cleanTitle.length > 15 && !cleanTitle.includes('\n')) {
              // Generic split for long titles
              const spaceIndex = cleanTitle.lastIndexOf(' ', 15);
              if (spaceIndex > 0) {
                titleLines = [cleanTitle.substring(0, spaceIndex), cleanTitle.substring(spaceIndex + 1)];
              }
            }
            
            return (
              <g 
                key={node.id}
                className={`${styles.nodeGroup} ${isTransition ? styles.nodeTransition : ''}`}
                pointerEvents="all"
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
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
        <g 
          className={styles.nodeGroup}
          pointerEvents="all"
          style={{ transformOrigin: `${900 + leftPadding}px 220px` }}
        >
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
            {t('about.timeline.futureNode.titleLine1')}
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
            {t('about.timeline.futureNode.titleLine2')}
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
            {t('about.timeline.futureNode.description')}
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
