import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
interface Props {
	margin: string;
	height: number;
	count: number;
}
interface StyledProps {
	margin?: string;
}
export const LoadingDiv = styled.div<StyledProps>`
	width: 100%;
	margin: ${(props) => (props.margin ? ` ${props.margin} 0` : ' 1rem 0 ')};
`;

const Loading: React.FC<Props> = ({ count, margin, height }) => {
	return (
		<LoadingDiv margin={margin}>
			<SkeletonTheme color="#C8C8C8" highlightColor="#B5B5B5">
				<Skeleton
					style={{ borderRadius: '0px' }}
					height={height}
					count={count}
				/>
			</SkeletonTheme>
		</LoadingDiv>
	);
};

export default Loading;
