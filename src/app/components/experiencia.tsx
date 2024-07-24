import * as React from "react";
import styles from "../page.module.css";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { PythonOriginal } from 'devicons-react';
import { VuejsOriginal } from 'devicons-react';
import { WordpressPlain } from 'devicons-react';
import { AzuresqldatabasePlain } from 'devicons-react';
import { GooglecloudOriginal } from 'devicons-react';
import { JavascriptOriginal } from 'devicons-react';
import { SolidityOriginal } from 'devicons-react';

export default function Experience () {

    return (
        <>
        <p>Work Experience</p>
            <div className= { styles.exp }>
                
            <Timeline
            sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
              >
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div className={styles.timelineTitle}>PMO Consultant</div>
                        <div>SEIDOR OpenTrends</div>
                        <div>Documentation and metrics for executing projects of CaixaBank Arquitecture </div>
                        <div>
                            <PythonOriginal size="50px"/>
                            <AzuresqldatabasePlain color="white" size="50px"/>
                            <GooglecloudOriginal size="50px"/>
                        </div>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div className={styles.timelineTitle}>R&D Researcher / Blockchain Developer</div>
                        <div>Ilimit Comunicacions S.L.</div>
                        <div>Research and development of a Blockchain project</div>
                        <div>
                            <PythonOriginal size="50px"/>
                            <VuejsOriginal size="50px"/>
                            <SolidityOriginal size="50px"/>
                        </div>
                        </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div className={styles.timelineTitle}>IT Technician / Web Developer</div>
                        <div>A-ser Reparapcs</div>
                        <div>IT tasks and Web development of small projects</div>
                        <div>
                            <WordpressPlain color="white" size="50px"/>
                            <JavascriptOriginal size="50px"/>
                        </div>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
            </div>
        </>
    );
}